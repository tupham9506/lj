<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\EventCounter;

class EventController extends Controller
{
  function __construct(Event $eventModel, EventCounter $eventCounter)
  {
    $this->eventModel = $eventModel;
    $this->eventCounter = $eventCounter;
  }
  public function getEventList(Request $request) {
    $input = $request->all();
    $input['user_id'] = $request->user()->id;
    $eventList = $this->eventModel->where('user_id', $input['user_id']);
    $time = strtotime($input['time']);
    switch ($input['mode']) {
      case 'weeks':
        $eventList = $eventList->whereRaw('WEEK(time)="' . date('W', $time) . '"');
        break;
      case 'months':
        $eventList = $eventList
          ->whereMonth('time', date('m', $time+1))
          ->whereYear('time', date('Y', $time));
        break;
      case 'years':
        $eventList = $eventList->whereYear('time', date('Y', $time));
        break;
      default:
        $eventList = $eventList->where('time', date('Y-m-d', $time));
        break;
    }
    $eventList = $eventList
      ->orderBy('time', 'desc')
      ->orderBy('created_at', 'desc')
      ->get();

    // Get and handle counter
    $eventCounterDB = $this->eventCounter
      ->where('user_id', $input['user_id'])
      ->get();
    $eventCounter = [
      'years' => [],
      'months' => [],
      'days' => []
    ];
    foreach ($eventCounterDB as $value) {
      $eventCounterType = $eventCounter[$value['type']][$value['time']] = $value['count'];
    }
    return response()->json(compact('eventList', 'eventCounter'), 200);
  }

  public function save(Request $request) {
    $input = $request->all();
    $input['user_id'] = $request->user()->id;

    \DB::beginTransaction();
    try {
      // Update event
      if(!empty($input['id'])) {
        // Decrease count
        $eventDetail = Event::where('id', $input['id'])->first();
        $dbInput = $input;
        $dbInput['count_value'] = -1;
        $dbInput['time'] = $eventDetail['time'];
        EventCounter::updateCount($dbInput);

        // Update event
        $this->eventModel
          ->where('user_id', $input['user_id'])
          ->where('id', $input['id'])
          ->update([
            'content' => $input['content'],
            'time' => $input['time'],
            'image' => $input['image']
          ]);

      } else {
        // Create event
        $this->eventModel->create($input);
      }

      EventCounter::updateCount($input);

      \DB::commit();
    } catch (\Exception $e) {
      \Log::info($e);
      \DB::rollback();
    }

    return response()->json([], 200);
  }
}
