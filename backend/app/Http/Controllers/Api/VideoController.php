<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Video;

class VideoController extends Controller
{
    public function index()
    {
        $videos = Video::orderBy('order')->get();
        return response()->json($videos)->header('X-Requested-By', 'VideoPlayerFrontend')
                                        ->header('Access-Control-Allow-Origin', '*');
    }

    public function detail($id)
    {
        $video = Video::find($id);
        return response()->json($video)->header('X-Requested-By', 'VideoPlayerFrontend')
                                        ->header('Access-Control-Allow-Origin', '*');
    }
}
