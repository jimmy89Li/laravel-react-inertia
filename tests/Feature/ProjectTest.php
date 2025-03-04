<?php

namespace Tests\Feature;

use App\Models\Project;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Testing\Fakes\Fake;
use Tests\TestCase;

class ProjectTest extends TestCase
{
    use RefreshDatabase;

    public function test_projects_creation_success(): void
    {
        User::factory(1)->create();
        $projects = Project::factory()->count(3)->create();
        $this->assertCount(3, $projects);
    }

    public function test_project_creation_success_with_details(): void
    {
        $user = User::factory()->create();
        $date = now()->addDays(7);
        $project = Project::factory()->create([
            'name'  => 'Project 1',
            'description' => 'This is a test project',
            'due_date' => $date,
            'status' => 'pending',
            'created_by' => $user->id,
            'updated_by' => $user->id,
        ]);
        $this->assertEquals('Project 1', $project->name);
        $this->assertEquals('This is a test project', $project->description);
        $this->assertEquals($date, $project->due_date);
        $this->assertEquals('pending', $project->status);
        $this->assertEquals($user->id, $project->created_by);
        $this->assertEquals($user->id, $project->updated_by);
    }
}
