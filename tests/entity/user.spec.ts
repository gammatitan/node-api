import Role, { ROLE_CONTENT_MANAGER_GKA, ROLE_PARTNER_MANAGER_GKA, ROLE_SUPER_ADMIN_GKA } from '../../src/entity/role';
import Type, { TYPE_ADMIN, TYPE_PARTNER } from '../../src/entity/type';
import User, { REGISTRATION_STATUS_APPROVED, REGISTRATION_STATUS_PENDING } from '../../src/entity/user';
import UserRole from '../../src/entity/user-role';

describe('user', () => {
    test('#isAdmin', () => {
        const user = new User();

        expect(user.isAdmin).toBe(false);

        const type = new Type();
        type.gka = TYPE_ADMIN;

        user.type = type;

        expect(user.isAdmin).toBe(true);
    });

    test('#isPartner', () => {
        const user = new User();

        expect(user.isPartner).toBe(false);

        const type = new Type();
        type.gka = TYPE_PARTNER;

        user.type = type;

        expect(user.isPartner).toBe(true);
    });

    test('#isSuperAdmin', () => {
        const user = new User();

        expect(user.isSuperAdmin).toBe(false);

        const role = new Role();
        role.gka = ROLE_SUPER_ADMIN_GKA;

        const userRole = new UserRole();
        userRole.user = user;
        userRole.role = role;

        user.userRoles = [userRole];

        expect(user.isSuperAdmin).toBe(true);
    });

    test('#isContentManager', () => {
        const user = new User();

        expect(user.isContentManager).toBe(false);

        const role = new Role();
        role.gka = ROLE_CONTENT_MANAGER_GKA;

        const userRole = new UserRole();
        userRole.user = user;
        userRole.role = role;

        user.userRoles = [userRole];

        expect(user.isContentManager).toBe(true);
    });

    test('#isPartnerManager', () => {
        const user = new User();

        expect(user.isPartnerManager).toBe(false);

        const role = new Role();
        role.gka = ROLE_PARTNER_MANAGER_GKA;

        const userRole = new UserRole();
        userRole.user = user;
        userRole.role = role;

        user.userRoles = [userRole];

        expect(user.isPartnerManager).toBe(true);
    });

    test('#isLocked', () => {
        const user = new User();

        [
            {
                failedLoginAttempts: 0,
                expected: false,
            },
            {
                failedLoginAttempts: 1,
                expected: false,
            },
            {
                failedLoginAttempts: 4,
                expected: false,
            },
            {
                failedLoginAttempts: 5,
                expected: true,
            },
            {
                failedLoginAttempts: 6,
                expected: true,
            },
            {
                failedLoginAttempts: 100,
                expected: true,
            },
        ].forEach((testCase) => {
            user.failedLoginAttempts = testCase.failedLoginAttempts;

            expect(testCase.expected).toBe(user.isLocked);
        });
    });

    test('#isRegistrationPending', () => {
        const user = new User();

        user.registrationStatus = REGISTRATION_STATUS_PENDING;

        expect(user.isRegistrationPending).toBeTruthy();

        user.registrationStatus = 'another status';

        expect(user.isRegistrationPending).toBeFalsy();
    });

    test('#isRegistrationApproved', () => {
        const user = new User();

        expect(user.isRegistrationApproved).toBeFalsy();

        user.registrationStatus = REGISTRATION_STATUS_APPROVED;

        expect(user.isRegistrationApproved).toBeTruthy();
    });
});
