<?php

namespace App\Models;

class EventCounter extends BaseModel
{
  protected $table = "event_counters";
  protected $fillable = [
    'user_id',
    'type',
    'time',
    'count'
  ];

  public static function getEventCounter ($input) {
    // Get and handle counter
    $eventCounterDB = EventCounter
      ::where('user_id', $input['user_id'])
      ->get();
    $eventCounter = [
      'years' => [],
      'months' => [],
      'days' => []
    ];
    foreach ($eventCounterDB as $value) {
      $eventCounterType = $eventCounter[$value['type']][$value['time']] = $value['count'];
    }
    return $eventCounter;
  }

  public static function updateCount ($input) {
    if(!isset($input['count_value'])) {
      $input['count_value'] = 1;
    }
    // Create event counter
    $timeArray = [
      'years' => date('Y-01-01', strtotime($input['time'])),
      'months' => date('Y-m-01', strtotime($input['time'])),
      'days' => date('Y-m-d', strtotime($input['time'])),
    ];

    foreach ($timeArray as $key => $value) {
      $eventCounter = EventCounter::firstOrCreate(
        [
          'user_id' => $input['user_id'],
          'type' => $key,
          'time' => $value
        ],
        [
          'count' => 0
        ]
      );
      $eventCounter->count = $eventCounter->count + $input['count_value'];
      $eventCounter->save();
    }
    return $eventCounter;
  }
}
