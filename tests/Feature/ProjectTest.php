<?php

namespace Tests\Feature;

use App\Models\Project;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProjectTest extends TestCase
{
    use RefreshDatabase;

    private User $user;
    private Project $project;
    private Collection $projects;
    private string $name = 'Project 1';
    private string $description = 'This is a test project';
    private Carbon $date;
    private string $status = 'pending';

    protected function setUp(): void
    {
        parent::setUp();
        $this->date = now()->addDays(7);
        $this->user = User::factory()->create();
        $this->projects = Project::factory(3)->create();
        $this->project = Project::factory()->create([
            'name'  => $this->name,
            'description' => $this->description,
            'due_date' => $this->date,
            'status' => $this->status,
            'created_by' => $this->user->id,
            'updated_by' => $this->user->id,
        ]);
    }

    public function test_projects_creation_success(): void
    {
        $this->assertCount(3, $this->projects);
    }

    public function test_project_creation_success_with_details(): void
    {
        $this->assertEquals($this->name, $this->project->name);
        $this->assertEquals($this->description, $this->project->description);
        $this->assertEquals($this->date, $this->project->due_date);
        $this->assertEquals($this->status, $this->project->status);
        $this->assertEquals($this->user->id, $this->project->created_by);
        $this->assertEquals($this->user->id, $this->project->updated_by);
    }
}
