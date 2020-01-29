<?php

namespace App\Models;

class Event extends BaseModel
{
  protected $table = "events";
  protected $fillable = [
    'user_id',
    'time',
    'content',
    'permisson',
    'image'
  ];

  public static function getList($input) {
    $eventList = Event::where('user_id', $input['user_id']);
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
    return $eventList;
  }
}
