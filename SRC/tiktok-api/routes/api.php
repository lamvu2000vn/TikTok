<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\VideoController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\AuthController;

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

// Auth
Route::post('/login', [AuthController::class, 'login']);
Route::get('/logout', [AuthController::class, 'logout']);
Route::get('/check-login', [AuthController::class, 'checkLogin']);
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/like-video/{id}', [VideoController::class, 'likeVideo']);
    Route::post('/submit-comment', [VideoController::class, 'submitComment']);
    Route::get('/delete-comment/{id}', [VideoController::class, 'deleteComment']);
});

// Public
Route::get('/stream-video/{filename}', [VideoController::class, 'streamVideo']);

Route::get('/recommended-users', [UserController::class, 'getRecommendedUsers']);
Route::post('/following-users', [UserController::class, 'getFollowingUsers']);
Route::get('/follow-user/{id}', [UserController::class, 'followUser']);

// User
Route::prefix('/user')->group(function () {
    Route::get('/{id}/order-infomation', [UserController::class, 'getOrtherInfomation']);
    Route::get('/{nickname}', [UserController::class, 'getUserByNickname']);
    Route::post('/{userIdentify}/videos', [UserController::class, 'getVideosOfuser']);
});

// Video
Route::post('/video/{id}/comments', [VideoController::class, 'getCommentsOfVideo']);

// Page
Route::post('/for-you', [VideoController::class, 'forYouPage']);
Route::post('/following', [VideoController::class, 'followingPage']);