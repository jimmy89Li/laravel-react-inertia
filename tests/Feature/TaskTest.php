<?php

namespace Tests\Feature;

use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class TaskTest extends TestCase
{
    use RefreshDatabase;

    public function test_tasks_creation_success(): void
    {
        User::factory(1)->create();
        Project::factory(1)->create();

        $tasks = Task::factory(10)->create([
            'project_id' => 1,
            'status' => 'pending',
            'priority' => 'low',
        ]);
        $this->assertCount(10, $tasks);
    }

    public function test_task_creation_with_details(): void
    {
        $user = User::factory()->create();
        $project = Project::factory()->create();
        $task = Task::factory()->create([
            'name' => 'Task 1',
            'description' => 'This is a test task',
            'project_id' => $project->id,
            'status' => 'pending',
            'priority' => 'low',
            'assigned_user_id' => $user->id,
            'created_by' => $user->id,
            'updated_by' => $user->id,
        ]);
        $this->assertEquals('Task 1', $task->name);
        $this->assertEquals('This is a test task', $task->description);
        $this->assertEquals('pending', $task->status);
        $this->assertEquals('low', $task->priority);
        $this->assertEquals($project->id, $task->project_id);
        $this->assertEquals($user->id, $task->assigned_user_id);
    }
}
