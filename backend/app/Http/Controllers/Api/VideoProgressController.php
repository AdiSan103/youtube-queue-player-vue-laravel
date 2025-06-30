<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\VideoProgress;

class VideoProgressController extends Controller
{
    public function index(Request $request, $id, $video_id)
    {
        $user = $request->user();
        $progress = VideoProgress::where('user_id', $id)
            ->where('video_id', $video_id)
            ->get();

        return response()->json([
            'message' => 'Progress retrieved',
            'data' => $progress
        ])->header('X-Requested-By', 'VideoPlayerFrontend')
            ->header('Access-Control-Allow-Origin', '*');
    }


    public function storeOrUpdate(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'video_id' => 'required|exists:videos,id',
            'last_position' => 'required|integer|min:0',
            'is_completed' => 'required|boolean',
        ]);

        $user = $request->user();

        $progress = VideoProgress::updateOrCreate(
            [
                'user_id' => $request->user_id,
                'video_id' => $request->video_id
            ],
            [
                'last_position' => $request->last_position,
                'is_completed' => $request->is_completed
            ]
        );

        return response()->json([
            'message' => 'Progress updated',
            'data' => $progress
        ])->header('X-App-Version', '1.0.0')
            ->header('X-Powered-By', 'Laravel')
            ->header('Cache-Control', 'no-cache');;
    }
}
