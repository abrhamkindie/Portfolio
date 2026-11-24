<?php

namespace App\Http\Controllers\Concerns;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

trait StoresPublicFiles
{
    /**
     * Build the absolute URL for a file on the public disk.
     * Uses the disk's own URL so local and bucket storage behave the same.
     */
    protected function publicFileUrl(string $path): string
    {
        return Storage::disk('public')->url($path);
    }

    /**
     * Delete a previously stored file from its absolute URL, if it belongs to
     * the public disk. External or legacy URLs are ignored.
     */
    protected function deletePublicFileFromUrl(?string $url): void
    {
        $path = $this->publicFilePathFromUrl($url);

        if ($path !== null) {
            Storage::disk('public')->delete($path);
        }
    }

    /**
     * Resolve the disk path of an absolute public URL.
     */
    protected function publicFilePathFromUrl(?string $url): ?string
    {
        if (! $url) {
            return null;
        }

        $prefix = rtrim(Storage::disk('public')->url(''), '/').'/';

        if (! Str::startsWith($url, $prefix)) {
            return null;
        }

        return Str::after($url, $prefix);
    }
}
