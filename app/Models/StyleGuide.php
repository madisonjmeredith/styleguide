<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StyleGuide extends Model
{
    /** @use HasFactory<\Database\Factories\StyleGuideFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'configuration',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'configuration' => 'array',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
