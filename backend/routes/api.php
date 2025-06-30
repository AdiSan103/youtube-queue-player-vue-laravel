<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\VideoController;
use App\Http\Controllers\Api\VideoProgressController;
    
// Video: list
Route::get('/videos', [VideoController::class, 'index']);

// Video: list
Route::get('/videos/{id}', [VideoController::class, 'detail']);

// VideoProgress: get progress list user
Route::get('/progress/{id}/{video_id}', [VideoProgressController::class, 'index']);

// VideoProgress: update atau simpan progress
Route::post('/progress', [VideoProgressController::class, 'storeOrUpdate']);