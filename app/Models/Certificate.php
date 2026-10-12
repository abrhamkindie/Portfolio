<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Certificate extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'issuer',
        'credential_id',
        'credential_url',
        'image',
        'description',
        'issued_at',
        'expires_at',
        'sort_order',
    ];

    protected $casts = [
        'user_id' => 'integer',
        'issued_at' => 'date',
        'expires_at' => 'date',
        'sort_order' => 'integer',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}