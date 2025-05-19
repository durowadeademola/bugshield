import React from 'react';
import { usePage } from '@inertiajs/react';

export default function Company() {
    const { user } = usePage().props;

    return (
        <div>
        <h1>{user.name}</h1>
        </div>
    );
}
  