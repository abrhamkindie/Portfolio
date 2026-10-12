<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
           $table->foreignId('user_id')
                  ->constrained()
                  ->cascadeOnDelete();

            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description');
            $table->longText('content')->nullable();
            $table->string('thumbnail')->nullable();
            $table->json('images')->nullable();
            $table->json('technologies')->nullable();
            $table->string('category', 100)->nullable();
            $table->string('live_url')->nullable();
            $table->string('github_url')->nullable();
            $table->boolean('featured')->default(false);
            $table->boolean('published')->default(true);
            $table->integer('sort_order')->default(0);
            $table->date('completed_at')->nullable();

            $table->timestamps();

            // 🔍 Composite index: most common admin list query
            // WHERE user_id = ? AND published = ? ORDER BY created_at DESC
            $table->index(
                ['user_id', 'published', 'created_at'],
                'projects_user_published_created_idx'
            );

            // ⭐ Featured projects per user
            $table->index(['user_id', 'featured'], 'projects_user_featured_idx');

            // 🏷️ Filter by category (dashboard stats, public filter)
            $table->index('category', 'projects_category_idx');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
