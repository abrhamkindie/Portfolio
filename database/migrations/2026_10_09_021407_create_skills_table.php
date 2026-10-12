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
        Schema::create('skills', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                  ->constrained()
                  ->cascadeOnDelete();

            $table->string('name');
            $table->string('category', 100)->default('General');
            $table->string('icon')->nullable();
            $table->unsignedTinyInteger('proficiency')->default(50); // 0–100
            $table->unsignedTinyInteger('years_of_experience')->nullable();
            $table->integer('sort_order')->default(0);

            $table->timestamps();

            // 🔍 Group skills by category for a user, ordered
            // WHERE user_id = ? ORDER BY category, sort_order
            $table->index(
                ['user_id', 'category', 'sort_order'],
                'skills_user_category_sort_idx'
            );
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('skills');
    }
};
