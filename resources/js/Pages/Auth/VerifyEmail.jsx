import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />

            <div className="mb-8">
                <h1 className="font-display text-2xl font-bold uppercase tracking-tight text-foreground">
                    Verify email
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    Thanks for signing up! Before getting started, could you
                    verify your email address by clicking on the link we just
                    emailed to you? If you didn't receive the email, we will
                    gladly send you another.
                </p>
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-sm font-medium text-primary">
                    A new verification link has been sent to the email address
                    you provided during registration.
                </div>
            )}

            <form onSubmit={submit} className="flex flex-wrap items-center justify-between gap-4">
                <PrimaryButton disabled={processing}>
                    Resend Verification Email
                </PrimaryButton>

                <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    className="text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
                >
                    Log Out
                </Link>
            </form>
        </GuestLayout>
    );
}
