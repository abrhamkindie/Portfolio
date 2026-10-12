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
        Schema::create('certificates', function (Blueprint $table) {
            $table->id();
           $table->foreignId('user_id')
                  ->constrained()
                  ->cascadeOnDelete();

            $table->string('title');
            $table->string('issuer');
            $table->string('credential_id')->nullable();
            $table->string('credential_url')->nullable();
            $table->string('image')->nullable();
            $table->text('description')->nullable();
            $table->date('issued_at')->nullable();
            $table->date('expires_at')->nullable();
            $table->integer('sort_order')->default(0);

            $table->timestamps();

            // 🔍 Latest certificates first per user
            // WHERE user_id = ? ORDER BY issued_at DESC
            $table->index(['user_id', 'issued_at'], 'certificates_user_issued_idx');

            // 🏢 Filter by issuer (e.g. "show me all AWS certs")
            $table->index('issuer', 'certificates_issuer_idx');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('certificates');
    }
};
