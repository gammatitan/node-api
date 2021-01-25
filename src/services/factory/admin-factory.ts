import User from '../../entity/user';

class AdminFactory {
    static create = () => {
        const user = new User();
    };
}

export default AdminFactory;
