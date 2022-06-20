<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\VideoController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\AuthController;
use Illuminate\Support\Facades\Auth;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/test', function() {
    return 'test';
});

Route::post('/login', [AuthController::class, 'login']);
Route::get('/logout', [AuthController::class, 'logout']);
Route::get('/check-login', [AuthController::class, 'checkLogin']);

Route::get('/recommended-users', [UserController::class, 'recommendedUsers']);
Route::post('/following-users', [UserController::class, 'followingUsers']);
Route::get('/stream-video/{filename}', [VideoController::class, 'streamVideo']);
Route::get('/follow-user/{id}', [UserController::class, 'followUser']);

// Page
Route::post('/for-you', [VideoController::class, 'forYouPage']);