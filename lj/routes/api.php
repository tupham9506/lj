<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login', 'UserController@login');
Route::post('register', 'UserController@register');
Route::post('login-fb', 'UserController@loginFb');
Route::group(['middleware' => 'auth:api'], function(){
  Route::get('/show/{id}', 'UserController@show');
  Route::group(['prefix' => 'event'], function(){
    Route::get('/get-list', 'EventController@getEventList');
    Route::post('/save', 'EventController@save');
  });
  // Home route
  Route::resource('home', 'HomeController');
});