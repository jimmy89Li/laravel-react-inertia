<?php

namespace Tests\Feature;

use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class TaskTest extends TestCase
{
    use RefreshDatabase;

    private User $user;
    private Project $project;
    private Collection $tasks;
    private Task $task;
    private string $name = 'Task 1';
    private string $description = 'This is a test task';
    private string $status = 'pending';
    private string $priority = 'low';

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        $this->project = Project::factory()->create();
        $this->tasks = Task::factory(10)->create([
            'name' => $this->name,
            'description' => $this->description,
            'project_id' => $this->project->id,
            'status' => $this->status,
            'priority' => $this->priority,
            'assigned_user_id' => $this->user->id,
            'created_by' => $this->user->id,
            'updated_by' => $this->user->id,
        ]);
        $this->task = $this->tasks->first();
    }

    public function test_tasks_creation_success(): void
    {
        $this->assertCount(10, $this->tasks);
    }

    public function test_task_creation_with_details(): void
    {
        $this->assertEquals($this->name, $this->task->name);
        $this->assertEquals($this->description, $this->task->description);
        $this->assertEquals($this->status, $this->task->status);
        $this->assertEquals($this->priority, $this->task->priority);
        $this->assertEquals($this->project->id, $this->task->project_id);
        $this->assertEquals($this->user->id, $this->task->assigned_user_id);
    }
}
