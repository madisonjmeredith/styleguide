<?php

namespace App\Policies;

use App\Models\StyleGuide;
use App\Models\User;

class StyleGuidePolicy
{
    public function view(User $user, StyleGuide $styleGuide): bool
    {
        return $user->id === $styleGuide->user_id;
    }

    public function update(User $user, StyleGuide $styleGuide): bool
    {
        return $user->id === $styleGuide->user_id;
    }

    public function delete(User $user, StyleGuide $styleGuide): bool
    {
        return $user->id === $styleGuide->user_id;
    }
}
