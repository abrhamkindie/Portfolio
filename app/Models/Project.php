<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'slug',
        'description',
        'content',
        'thumbnail',
        'images',
        'technologies',
        'category',
        'live_url',
        'github_url',
        'featured',
        'published',
        'sort_order',
        'completed_at',
    ];

    protected $casts = [
        'user_id' => 'integer',
        'images' => 'array',
        'technologies' => 'array',
        'featured' => 'boolean',
        'published' => 'boolean',
        'sort_order' => 'integer',
        'completed_at' => 'date',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}