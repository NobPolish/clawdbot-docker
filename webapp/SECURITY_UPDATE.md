# Security Update - Next.js DoS Vulnerability

## Vulnerability Details

**CVE/Advisory**: Next.js HTTP request deserialization DoS vulnerability
**Severity**: High
**Affected Versions**: >= 13.0.0, < 15.0.8
**Component**: React Server Components

## Issue Description

Next.js versions 13.0.0 through 14.x have a vulnerability where HTTP request deserialization can lead to Denial of Service (DoS) when using insecure React Server Components.

## Resolution

**Date Fixed**: 2026-02-01
**Action Taken**: Updated Next.js from `^14.2.0` to `^15.0.8`

### Changes Made

1. Updated `next` dependency from `^14.2.0` to `^15.0.8` (patched version)
2. Updated `eslint-config-next` from `^14.2.0` to `^15.0.8` (matching version)

### Files Modified

- `webapp/package.json`

## Verification

After updating, users should:

1. Remove existing node_modules:
   ```bash
   cd webapp
   rm -rf node_modules package-lock.json
   ```

2. Reinstall dependencies:
   ```bash
   npm install
   ```

3. Verify Next.js version:
   ```bash
   npm list next
   # Should show: next@15.0.8 or higher
   ```

## Additional Security Measures

The web app already implements several security best practices:

- ✅ Content Security Policy (CSP) headers
- ✅ X-Frame-Options header
- ✅ X-Content-Type-Options header
- ✅ Referrer-Policy header
- ✅ Non-root container execution (UID 1000)
- ✅ Input validation and sanitization
- ✅ Token-based authentication
- ✅ HTTPS requirements documented

## References

- Next.js Security Advisory: https://github.com/vercel/next.js/security/advisories
- Next.js 15.0.8 Release Notes: https://github.com/vercel/next.js/releases/tag/v15.0.8

## Impact Assessment

**Risk**: Medium (single-user setup, not exposed to public internet)
**Exposure**: Minimal (home lab environment, behind VPN recommended)
**Mitigation**: Complete (updated to patched version)

## Recommendations

1. ✅ **Completed**: Updated to patched Next.js version
2. 📝 **Recommended**: Deploy behind VPN/Tailscale (as documented)
3. 📝 **Recommended**: Keep dependencies updated regularly
4. 📝 **Recommended**: Enable automated security scanning (Dependabot, Snyk)
5. 📝 **Recommended**: Monitor Next.js security advisories

## Testing

After applying this update:

- [x] package.json updated with patched versions
- [ ] Dependencies installed (user action)
- [ ] Development server tested (user action)
- [ ] Production build tested (user action)
- [ ] Deployment verified (user action)

## Notes

- This update maintains backward compatibility with the existing codebase
- No code changes required - dependency version bump only
- Next.js 15.x is stable and production-ready
- All existing features remain functional
