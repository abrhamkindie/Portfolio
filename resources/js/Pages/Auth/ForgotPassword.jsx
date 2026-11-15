import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="mb-8">
                <h1 className="font-display text-2xl font-bold uppercase tracking-tight text-foreground">
                    Forgot password
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    Enter your email address and we will email you a password
                    reset link.
                </p>
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-primary">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="block w-full"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <PrimaryButton disabled={processing} className="w-full">
                    Email Password Reset Link
                </PrimaryButton>
            </form>
        </GuestLayout>
    );
}
