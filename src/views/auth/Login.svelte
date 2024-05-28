<script lang="ts">
  import { toast } from 'svelte-sonner';
  import { superForm } from 'sveltekit-superforms/client';

  import {
    MAX_EMAIL_LENGTH,
    MAX_PASSWORD_LENGTH,
    UserLoginZodSchema
  } from '../../lib/validations/authZodShemas';

  import InputField from '../../lib/components/form/InputField.svelte';
  import SubmitButton from '../../lib/components/form/SubmitButton.svelte';

  import { route } from '../../lib/ROUTES';
  import type { PageData } from './$types';

  export let data: PageData;

  const { enhance, form, errors, message } = superForm(data?.userLoginFormData, {
    resetForm: true,
    taintedMessage: null,
    validators: UserLoginZodSchema,

    onUpdated: () => {
      if (!$message) return;

      const { alertType, alertText } = $message;

      if (alertType === 'error') {
        toast.error(alertText);
      }
    }
  });

</script>

<div class="container mx-auto px-4 h-full">
  <div class="flex content-center items-center justify-center h-full">
    <div class="w-full lg:w-4/12 px-4">
      <div
        class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0"
      >
        <div class="rounded-t mb-0 px-6 py-6">
          <div class="text-center mb-3">
            <h6 class="text-blueGray-500 text-sm font-bold">Sign in</h6>
          </div>
          <hr class="mt-6 border-b-1 border-blueGray-300" />
        </div>
        <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form method="post" use:enhance action={route('logInUser /auth/login')}>
            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                for="grid-email"
              >
                Email
              </label>
              <InputField
                      id="grid-email"
                      type="email"
                      name="email"
                      label="Email"
                      bind:value={$form.email}
                      errorMessage={$errors.email}
                      maxlength={MAX_EMAIL_LENGTH}
              />
            </div>

            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                for="grid-password"
              >
                Password
              </label>
              <InputField
                      id="grid-password"
                      type="password"
                      name="password"
                      label="Password"
                      bind:value={$form.password}
                      errorMessage={$errors.password}
                      maxlength={MAX_PASSWORD_LENGTH}
              />
            </div>
            <div>
              <label class="inline-flex items-center cursor-pointer">
                <input
                  id="customCheckLogin"
                  type="checkbox"
                  class="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                />
                <span class="ml-2 text-sm font-semibold text-blueGray-600">
                  Remember me
                </span>
              </label>
            </div>

            <div class="text-center mt-6">
              <SubmitButton />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
