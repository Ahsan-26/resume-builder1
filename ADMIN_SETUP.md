# Admin Panel Setup Guide

## Environment Configuration

To secure the admin panel, you need to set up a secret admin route in your environment variables.

### Step 1: Add Environment Variable

Add the following to your `.env.local` file:

```env
NEXT_PUBLIC_ADMIN_SECRET_ROUTE=your-secret-admin-route-here
```

**Example:**
```env
NEXT_PUBLIC_ADMIN_SECRET_ROUTE=secure-admin-xyz-2024
```

> ⚠️ **Important**: Choose a unique, hard-to-guess route name for production. This adds an extra layer of security by obscuring the admin login URL.

### Step 2: Access Admin Login

Once configured, access the admin login page at:
```
http://localhost:3000/admin-login
```

Or for production:
```
https://yourdomain.com/admin-login
```

## Creating Admin Users

Admin users must have **both** of the following set in the Django backend:

1. **`is_staff = True`** - Django staff flag
2. **`role = "admin"`** - Application role

### Via Django Admin Panel

1. Log into Django admin: `http://localhost:8000/admin/`
2. Navigate to Users
3. Select or create a user
4. Check the following:
   - ✅ **Staff status** checkbox
   - ✅ Set **Role** to "Admin"
5. Save the user

### Via Django Shell

```python
python manage.py shell

from accounts.models import User

# Create new admin user
admin_user = User.objects.create_user(
    email='admin@example.com',
    password='securepassword123',
    is_staff=True,
    role=User.Roles.ADMIN
)

# Or update existing user
user = User.objects.get(email='user@example.com')
user.is_staff = True
user.role = User.Roles.ADMIN
user.save()
```

## Authentication Flow

1. **User navigates to `/admin-login`**
   - Displays admin-branded login form
   - If already logged in as admin → redirects to `/admin`

2. **User enters credentials**
   - System validates email and password
   - Checks if user has `is_staff=True` OR `role="admin"`

3. **Authorization Check**
   - ✅ **Authorized**: Redirect to `/admin` dashboard
   - ❌ **Unauthorized**: Show "Access Denied" error, logout user, stay on login page

4. **Accessing Admin Routes**
   - All `/admin/*` routes are protected
   - Non-authenticated users → redirect to `/admin-login`
   - Authenticated but non-staff users → redirect to `/` with error message

## Security Features

- ✅ Dual authentication check (`is_staff` + `role`)
- ✅ Dedicated admin login page (separate from regular user login)
- ✅ Proper error messages for unauthorized access
- ✅ Automatic logout on failed admin access attempt
- ✅ Protected admin routes with layout-level guards
- ✅ Secret URL endpoint capability (via environment variable)

## Testing

### Test Case 1: Admin User Login
1. Create user with `is_staff=True` and `role="admin"`
2. Navigate to `/admin-login`
3. Login with credentials
4. ✅ Should redirect to `/admin` dashboard

### Test Case 2: Regular User Attempting Admin Access
1. Create user with `is_staff=False` and `role="user"`
2. Navigate to `/admin-login`
3. Login with credentials
4. ✅ Should show "Access Denied" error
5. ✅ Should logout user automatically

### Test Case 3: Direct Admin Route Access
1. Without logging in, navigate to `/admin`
2. ✅ Should redirect to `/admin-login`

### Test Case 4: Regular User Accessing Admin After Login
1. Login as regular user via `/auth/login`
2. Try to navigate to `/admin`
3. ✅ Should show "Access Denied" error
4. ✅ Should redirect to `/`

## Troubleshooting

### "Access Denied" Error
- Verify user has `is_staff=True` in Django admin
- Verify user has `role="admin"` in Django admin
- Check that backend is returning both fields in `/auth/me/` response

### Cannot Access Admin Panel
- Ensure you're using the correct login page: `/admin-login`
- Check browser console for errors
- Verify backend is running and accessible
- Check that JWT tokens are being stored correctly

### Environment Variable Not Working
- Ensure `.env.local` file is in the project root
- Restart the Next.js development server after adding variables
- Variables must start with `NEXT_PUBLIC_` to be accessible in the browser
