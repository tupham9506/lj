<?php
namespace App\Http\Controllers\API;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Auth;
use Validator;
use Facebook\Facebook;

class UserController extends Controller {

  public function login () {
    if(Auth::attempt(['account' => request('account'), 'password' => request('password')])){
      $user = Auth::user();
      $user['token'] = $user->createToken('tokenlj')->accessToken;
      return response()->json(['user' => $user], 200);
    } else {
      return response()->json([
        'messages' => [
          'common' => [trans('login.fail')]
        ]
      ], 422);
    }
  }

  public function register(Request $request) {
    $validator = Validator::make($request->all(), [
      'account' => 'required|unique:users,account',
      'password' => 'required',
      'dob_day' => 'required',
      'dob_month' => 'required',
      'dob_year' => 'required',
      'lifespan' => 'required',
    ], [
      'account.required' => trans('register.account.required'),
      'account.unique' => trans('register.account.unique'),
      'password.required' => trans('register.password.required'),
      'dob_day.required' => trans('register.dob.required'),
      'dob_month.required' => trans('register.dob.required'),
      'dob_year.required' => trans('register.dob.required'),
      'lifespan.required' => trans('register.lifespan.required'),
    ]);
    if ($validator->fails()) {
      return response()->json([
        'messages' => $validator->errors()
      ], 422);
    }
    $input = $request->all();
    $input['password'] = bcrypt($input['password']);
    $input['name'] = $input['account'];
    $user = User::create($input);
    $success['token'] =  $user->createToken('tokenlj')->accessToken;
    $success['account'] = $user->account;
    $success['name'] = $user->name;
    return response()->json(['user' => $success], 200);
  }

  public function show ($id, Request $request) {
    $input = $request->all();
    $input['user_id'] = $id;
    $user = User::where([ 'account' => $id])->first();
    $eventList = Event::getList($input);
    dd($eventList);
    return response()->json(compact('user', 'eventList'));
  }

  public function loginFb(Request $request)
  {
    $input = $request->all();
    $fb = new Facebook([
      'app_id' => config('services.facebook.app_id'),
      'app_secret' => config('services.facebook.app_secret'),
    ]);

    try {
      $response = $fb->get('/me?fields=id,name,picture', $input['access_token']);
        $profile = $response->getGraphUser();
        if (empty($profile['id'])) {
          return response()->json([
            'messages' => [
              'common' => trans('login.fb_fail')
            ]
          ], 422);
        }
        $saveData = [
          'account' => 'fb.' . $profile['id'],
          'name' => $profile['name'],
          'password' => bcrypt(rand()),
          'is_absolute_avatar' => 1,
        ];

        if (!empty($profile['picture'])) {
          $saveData['is_absolute_avatar'] = 1;
          $saveData['avatar'] = $profile['picture']['url'];
        }

        $user = User::firstOrCreate([
          'account' => 'fb.' . $profile['id']
        ], $saveData);
        $user['token'] = $user->createToken('tokenlj')->accessToken;
        return response()->json(['user' => $user], 200);
    } catch (\Exception $e) {
       return response()->json([
          'messages' => [
            'common' => trans('login.fb_fail')
          ]
        ], 422);
    }
  }

}