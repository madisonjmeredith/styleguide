<?php

namespace App\Http\Requests\StyleGuide;

use Illuminate\Foundation\Http\FormRequest;

class StoreStyleGuideRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, array<int, string>>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'configuration' => ['required', 'array'],
            'configuration.primaryColor' => ['required', 'string', 'max:20'],
            'configuration.secondaryColor' => ['required', 'string', 'max:20'],
            'configuration.neutralFamily' => ['required', 'string', 'in:cool,neutral,warm'],
            'configuration.headingFont' => ['required', 'string', 'max:100'],
            'configuration.bodyFont' => ['required', 'string', 'max:100'],
            'configuration.iconLibrary' => ['required', 'string', 'in:fontawesome,heroicons,feather'],
            'configuration.borderEnabled' => ['required', 'boolean'],
            'configuration.shadowEnabled' => ['required', 'boolean'],
            'configuration.radius' => ['required', 'integer', 'in:0,4,8,12,16'],
        ];
    }
}
