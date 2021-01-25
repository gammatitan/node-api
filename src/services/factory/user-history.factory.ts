import User from '../../entity/user';
import UserHistory, { UserHistoryType } from '../../entity/user-history';

class UserHistoryFactory {
    static create = (type: UserHistoryType, user: User, adminUser: User = null) => {
        const userHistory = new UserHistory();

        userHistory.type = type;
        userHistory.user = user;
        userHistory.updatedBy = adminUser;

        return userHistory;
    };
}

export default UserHistoryFactory;
