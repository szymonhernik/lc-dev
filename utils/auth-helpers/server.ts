'use server';

import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getURL, getErrorRedirect, getStatusRedirect } from 'utils/helpers';
import { getAuthTypes } from 'utils/auth-helpers/settings';

function isValidEmail(email: string) {
  var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
}

export async function redirectToPath(path: string) {
  return redirect(path);
}

export async function SignOut(formData: FormData) {
  const pathName = String(formData.get('pathName')).trim();

  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return getErrorRedirect(
      pathName,
      'Hmm... Something went wrong.',
      'You could not be signed out.'
    );
  }

  return '/signin';
}

export async function signInWithEmail(formData: FormData) {
  const cookieStore = cookies();
  const callbackURL = getURL('/auth/callback');

  const email = String(formData.get('email')).trim();
  let redirectPath: string;

  if (!isValidEmail(email)) {
    redirectPath = getErrorRedirect(
      '/signin/email_signin',
      'Invalid email address.',
      'Please try again.'
    );
  }

  const supabase = createClient();
  let options = {
    emailRedirectTo: callbackURL,
    shouldCreateUser: true
  };

  // If allowPassword is false, do not create a new user
  const { allowPassword } = getAuthTypes();
  if (allowPassword) options.shouldCreateUser = false;
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: options
  });

  if (error) {
    redirectPath = getErrorRedirect(
      '/signin/email_signin',
      'You could not be signed in.',
      error.message
    );
  } else if (data) {
    cookieStore.set('preferredSignInView', 'email_signin', { path: '/' });
    redirectPath = getStatusRedirect(
      '/signin/email_signin',
      'Success!',
      'Please check your email for a magic link. You may now close this tab.',
      true
    );
  } else {
    redirectPath = getErrorRedirect(
      '/signin/email_signin',
      'Hmm... Something went wrong.',
      'You could not be signed in.'
    );
  }

  return redirectPath;
}

export async function requestPasswordUpdate(formData: FormData) {
  const callbackURL = getURL('/auth/reset_password');

  // Get form data
  const email = String(formData.get('email')).trim();
  let redirectPath: string;

  if (!isValidEmail(email)) {
    redirectPath = getErrorRedirect(
      '/signin/forgot_password',
      'Invalid email address.',
      'Please try again.'
    );
  }

  const supabase = createClient();

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: callbackURL
  });

  if (error) {
    redirectPath = getErrorRedirect(
      '/signin/forgot_password',
      error.message,
      'Please try again.'
    );
  } else if (data) {
    redirectPath = getStatusRedirect(
      '/signin/forgot_password',
      'Success!',
      'Please check your email for a password reset link. You may now close this tab.',
      true
    );
  } else {
    redirectPath = getErrorRedirect(
      '/signin/forgot_password',
      'Hmm... Something went wrong.',
      'Password reset email could not be sent.'
    );
  }

  return redirectPath;
}

export async function signInWithPassword(formData: FormData) {
  const cookieStore = cookies();
  const email = String(formData.get('email')).trim();
  const password = String(formData.get('password')).trim();
  let redirectPath: string;

  const supabase = createClient();
  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  // console.log('data', data);

  if (error) {
    redirectPath = getErrorRedirect(
      '/signin/password_signin',
      'Sign in failed.',
      error.message
    );
  } else if (data.user) {
    cookieStore.set('preferredSignInView', 'password_signin', { path: '/' });
    redirectPath = getStatusRedirect('/', 'Success!', 'You are now signed in.');
  } else {
    redirectPath = getErrorRedirect(
      '/signin/password_signin',
      'Hmm... Something went wrong.',
      'You could not be signed in.'
    );
  }

  return redirectPath;
}

export async function signUp(formData: FormData) {
  const callbackURL = getURL('/auth/callback');

  const email = String(formData.get('email')).trim();
  const password = String(formData.get('password')).trim();
  let redirectPath: string;

  if (!isValidEmail(email)) {
    redirectPath = getErrorRedirect(
      '/signin/signup',
      'Invalid email address.',
      'Please try again.'
    );
  }

  const supabase = createClient();
  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: callbackURL
    }
  });

  if (error) {
    redirectPath = getErrorRedirect(
      '/signin/signup',
      'Sign up failed.',
      error.message
    );
  } else if (data.session) {
    redirectPath = getStatusRedirect('/', 'Success!', 'You are now signed in.');
  } else if (
    data.user &&
    data.user.identities &&
    data.user.identities.length == 0
  ) {
    redirectPath = getErrorRedirect(
      '/signin/signup',
      'Sign up failed.',
      'There is already an account associated with this email address. Try resetting your password.'
    );
  } else if (data.user) {
    redirectPath = getStatusRedirect(
      '/',
      'Success!',
      'Please check your email for a confirmation link. You may now close this tab.'
    );
  } else {
    redirectPath = getErrorRedirect(
      '/signin/signup',
      'Hmm... Something went wrong.',
      'You could not be signed up.'
    );
  }

  return redirectPath;
}

export async function updatePassword(formData: FormData) {
  const password = String(formData.get('password')).trim();
  const passwordConfirm = String(formData.get('passwordConfirm')).trim();
  let redirectPath: string;

  // Check that the password and confirmation match
  if (password !== passwordConfirm) {
    redirectPath = getErrorRedirect(
      '/signin/update_password',
      'Your password could not be updated.',
      'Passwords do not match.'
    );
  }

  const supabase = createClient();
  const { error, data } = await supabase.auth.updateUser({
    password
  });

  if (error) {
    redirectPath = getErrorRedirect(
      '/signin/update_password',
      'Your password could not be updated.',
      error.message
    );
  } else if (data.user) {
    redirectPath = getStatusRedirect(
      '/account',
      'Success!',
      'Your password has been updated.'
    );
  } else {
    redirectPath = getErrorRedirect(
      '/signin/update_password',
      'Hmm... Something went wrong.',
      'Your password could not be updated.'
    );
  }

  return redirectPath;
}

// export async function updatePasswordInAccount(formData: FormData) {
//   const password = String(formData.get('password')).trim();
//   const passwordConfirm = String(formData.get('passwordConfirm')).trim();
//   let redirectPath: string;

//   // Check that the password and confirmation match

//   if (password !== passwordConfirm) {
//     console.log('password:', password);
//     console.log('passwordConfirm:', passwordConfirm);

//     redirectPath = getErrorRedirect(
//       '/account',
//       'Your password could not be updated.',
//       'Passwords do not match.'
//     );
//     return redirectPath;
//   }

//   const supabase = createClient();
//   const { error, data } = await supabase.auth.updateUser({
//     password
//   });

//   if (error) {
//     redirectPath = getErrorRedirect(
//       '/account',
//       'Your password could not be updated.',
//       error.message
//     );
//   } else if (data.user) {
//     redirectPath = getStatusRedirect(
//       '/account',
//       'Success!',
//       'Your password has been updated.'
//     );
//   } else {
//     redirectPath = getErrorRedirect(
//       '/account',
//       'Hmm... Something went wrong.',
//       'Your password could not be updated.'
//     );
//   }

//   return redirectPath;
// }
export async function updatePasswordInAccountForm(
  prevState: any,
  formData: FormData
) {
  const password = String(formData.get('password')).trim();
  const passwordConfirm = String(formData.get('passwordConfirm')).trim();

  if (password !== passwordConfirm) {
    return { error: true, message: 'Passwords do not match.' };
  }

  const supabase = createClient();

  const { error, data } = await supabase.auth.updateUser({ password });

  if (error) {
    return { error: true, message: error.message };
  }

  if (data.user) {
    return { success: true, message: 'Your password has been updated.' };
  }

  // Fallback error message
  return { error: true, message: 'Hmm... Something went wrong.' };
}

export async function updateEmail(formData: FormData) {
  // Get form data
  const newEmail = String(formData.get('newEmail')).trim();

  // Check that the email is valid
  if (!isValidEmail(newEmail)) {
    return getErrorRedirect(
      '/account',
      'Your email could not be updated.',
      'Invalid email address.'
    );
  }

  const supabase = createClient();

  const callbackUrl = getURL(
    getStatusRedirect('/account', 'Success!', `Your email has been updated.`)
  );

  const { error } = await supabase.auth.updateUser(
    { email: newEmail },
    {
      emailRedirectTo: callbackUrl
    }
  );

  if (error) {
    return getErrorRedirect(
      '/account',
      'Your email could not be updated.',
      error.message
    );
  } else {
    return getStatusRedirect(
      '/account',
      'Confirmation emails sent.',
      `You will need to confirm the update by clicking the links sent to both the old and new email addresses.`
    );
  }
}

// export async function updateName(formData: FormData) {
//   const fullName = String(formData.get('fullName')).trim();

//   const supabase = createClient();
//   const { error, data } = await supabase.auth.updateUser({
//     data: { full_name: fullName }
//   });

//   if (error) {
//     return getErrorRedirect(
//       '/account',
//       'Your name could not be updated.',
//       error.message
//     );
//   } else if (data.user) {
//     return getStatusRedirect(
//       '/account',
//       'Success!',
//       'Your name has been updated.'
//     );
//   } else {
//     return getErrorRedirect(
//       '/account',
//       'Hmm... Something went wrong.',
//       'Your name could not be updated.'
//     );
//   }
// }

// export async function updateName(formData: FormData) {
//   const fullName = String(formData.get('fullName')).trim();
//   const supabase = createClient();

//   const { data: userDetails, error: userError } = await supabase
//     .from('users')
//     .select('id')
//     .single();

//   if (userError) {
//     console.error('Failed to retrieve user details:', userError.message);
//     return getErrorRedirect(
//       '/account',
//       'User details could not be retrieved.',
//       userError.message
//     );
//   }
//   const { error } = await supabase
//     .from('users')
//     .update({ full_name: fullName })
//     .match({ id: userDetails?.id })
//     .single();

//   if (error) {
//     console.error('Update error:', error.message);
//     return getErrorRedirect(
//       '/account',
//       'Your name could not be updated.',
//       error.message
//     );
//   } else {
//     return getStatusRedirect(
//       '/account',
//       'Success!',
//       'Your name has been updated.'
//     );
//   }
// }

export async function updateName(formData: FormData) {
  const fullName = String(formData.get('fullName')).trim();
  const supabase = createClient();

  // Retrieve the user's ID from the custom users table
  const { data: userDetails, error: userDetailsError } = await supabase
    .from('users')
    .select('id')
    .single();

  if (userDetailsError) {
    console.error('Failed to retrieve user details:', userDetailsError.message);
    return getErrorRedirect(
      '/account',
      'User details could not be retrieved.',
      userDetailsError.message
    );
  }

  // Update the name in the custom users table
  const { error: usersUpdateError } = await supabase
    .from('users')
    .update({ full_name: fullName })
    .match({ id: userDetails?.id })
    .single();

  if (usersUpdateError) {
    console.error('Failed to update users table:', usersUpdateError.message);
    return getErrorRedirect(
      '/account',
      'Users table update failed.',
      usersUpdateError.message
    );
  } else {
    return getStatusRedirect(
      '/account',
      'Success!',
      'Your name has been updated.'
    );
  }
}
