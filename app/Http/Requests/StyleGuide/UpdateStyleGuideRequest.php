<?php

namespace App\Http\Requests\StyleGuide;

use Illuminate\Foundation\Http\FormRequest;

class UpdateStyleGuideRequest extends FormRequest
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
            'configuration.iconLibrary' => ['required', 'string', 'in:fontawesome-regular,fontawesome-solid,heroicons,lucide,material-symbols'],
            'configuration.headingFontMeta' => ['sometimes', 'array'],
            'configuration.headingFontMeta.category' => ['required_with:configuration.headingFontMeta', 'string', 'max:50'],
            'configuration.headingFontMeta.weights' => ['required_with:configuration.headingFontMeta', 'string', 'max:100'],
            'configuration.bodyFontMeta' => ['sometimes', 'array'],
            'configuration.bodyFontMeta.category' => ['required_with:configuration.bodyFontMeta', 'string', 'max:50'],
            'configuration.bodyFontMeta.weights' => ['required_with:configuration.bodyFontMeta', 'string', 'max:100'],
            'configuration.typeScale' => ['required', 'string', 'in:small,regular,large,extra-large'],
            'configuration.borderWidth' => ['required', 'integer', 'in:0,1,2'],
            'configuration.shadowEnabled' => ['required', 'boolean'],
            'configuration.radius' => ['required', 'integer', 'in:0,4,8,12,16'],
        ];
    }
}
