const logoutButton = new LogoutButton();

logoutButton.action = () => {
    ApiConnector.logout(response => {
        if (response.success) {
            location.reload();
        }
    });
}

ApiConnector.current(response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
});

const ratesBoard = new RatesBoard();

const upStocks = () => {
    ApiConnector.getStocks(response => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    });
}
upStocks();
setInterval(upStocks, 60000);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = data => {

    ApiConnector.addMoney(data, response => {
        console.log(response.data);
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(false, 'Баланс успешно пополнен');
        } else {
            moneyManager.setMessage(true, response.data);
        }
    });
}

moneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(false, 'Конвертация успешно выполнена');
        } else {
            moneyManager.setMessage(true, response.data);
        }
    });
}

moneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => {

        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(false, 'Перевод успешно выполнен');
        } else {
            moneyManager.setMessage(true, response.data);
        }
    });
}

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(response => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
});

favoritesWidget.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(false, 'Пользователь добавлен');
        } else {
            favoritesWidget.setMessage(true, response.data);
        }
    });
}

favoritesWidget.removeUserCallback = data => {

    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(false, 'Пользователь удален');
        } else {
            favoritesWidget.setMessage(true, response.data);
        }
    });
}