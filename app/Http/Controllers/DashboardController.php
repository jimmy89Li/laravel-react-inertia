<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $myTasks = Task::orderBy("created_at", "desc")
            ->where("assigned_user_id", Auth::user()->id)
            ->get();
        $myTasks = TaskResource::collection($myTasks);
        $totalPendingTasks = Task::query()
            ->where('status', 'pending')
            ->count();
        $myPendingTasks = Task::query()
            ->where('assigned_user_id', Auth::id())
            ->where('status', 'pending')
            ->count();
        $totalInProgressTasks = Task::query()
            ->where('status', 'in_progress')
            ->count();
        $myInProgressTasks = Task::query()
            ->where('assigned_user_id', Auth::id())
            ->where('status', 'in_progress')
            ->count();
        $totalCompletedTasks = Task::query()
            ->where('status', 'completed')
            ->count();
        $myCompletedTasks = Task::query()
            ->where('assigned_user_id', Auth::id())
            ->where('status', 'completed')
            ->count();
        return inertia(
            'Dashboard',
            compact(
                'myTasks',
                'totalPendingTasks',
                'myPendingTasks',
                'totalInProgressTasks',
                'myInProgressTasks',
                'totalCompletedTasks',
                'myCompletedTasks',
            )
        );
    }
}
