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
        Schema::create('experiences', function (Blueprint $table) {
            $table->id();
           $table->foreignId('user_id')
                  ->constrained()
                  ->cascadeOnDelete();

            $table->string('company');
            $table->string('position');
            $table->string('location')->nullable();
            $table->text('description')->nullable();
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->boolean('is_current')->default(false);
            $table->integer('sort_order')->default(0);

            $table->timestamps();

            // 🔍 Work history timeline per user
            // WHERE user_id = ? ORDER BY start_date DESC
            $table->index(['user_id', 'start_date'], 'experiences_user_start_idx');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('experiences');
    }
};
