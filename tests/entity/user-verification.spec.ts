import UserVerification from '../../src/entity/user-verification';

describe('#isPasswordResetRequestExpired', () => {
    it('does not have an expired reset password request', () => {
        const userVerification = new UserVerification();
        const passwordRequestedAt = new Date();

        userVerification.passwordResetRequestedAt = passwordRequestedAt;

        expect(userVerification.isPasswordResetRequestExpired).toEqual(false);
    });

    it('has an expired reset password request', () => {
        const userVerification = new UserVerification();
        const passwordRequestedAt = new Date();

        passwordRequestedAt.setDate(passwordRequestedAt.getDate() + 2);

        userVerification.passwordResetRequestedAt = passwordRequestedAt;

        expect(userVerification.isPasswordResetRequestExpired).toEqual(true);
    });

    it('has a password expiry date of one day', () => {
        const now = new Date();
        now.setDate(now.getDate() + 1);

        const userVerification = new UserVerification();

        expect(userVerification.passwordRequestExpiryDate.toDateString()).toEqual(now.toDateString());
    });
});
