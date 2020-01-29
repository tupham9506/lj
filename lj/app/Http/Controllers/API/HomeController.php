<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Event;
use App\User;
use App\Models\EventCounter;

class HomeController extends Controller
{
  public function index(Request $request) {
    $input = $request->all();
    $user = User::where([ 'account' => $input['account']])->first();
    $input['user_id'] = $user['id'];
    $eventList = Event::getList($input);
    $eventCounter = EventCounter::getEventCounter($input);
    return response()->json(compact('user', 'eventList', 'eventCounter'));
  }
}
