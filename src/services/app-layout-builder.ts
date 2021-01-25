import User from '../entity/user';

type SidebarItems = Array<{
    gka: string;
    url: string;
}>;

interface Layout {
    sidebarItems: SidebarItems;
}

class AppLayoutBuilder {
    public build = (user: User): Layout => {
        const layout = {
            sidebarItems: this.sidebarItems(user),
        };

        return layout;
    };

    private sidebarItems = (user: User): SidebarItems => {
        if (user.isAdmin) {
            return [
                {
                    gka: 'dashboard',
                    url: '/dashboard',
                },
            ];
        }

        if (user.isPartner) {
            return [
                {
                    gka: 'dashboard',
                    url: '/dashboard',
                },
            ];
        }

        return [];
    };
}

export default AppLayoutBuilder;
