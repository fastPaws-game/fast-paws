export const initialStore = {
  auth: {
    user: {
      id: 3,
      login: 'sdcsdc',
      first_name: 'sdcsdc',
      second_name: 'sdcsdc',
      display_name: 'sdcsdc',
      avatar: 'ssdcsdc',
      phone: 'sdcsdc',
      email: 'sdcsdc'
    },
    isAuth: false,

    signInStatus: 'initial',
    signInError: null,

    signUpStatus: 'initial',
    signUpError: null,

    logOutStatus: 'initial',
    logOutError: null,

    avatarStatus: 'initial',
    avatarError: null,

    userStatus: 'initial',
    userError: null
  },
  game: {},
  theme: {
    currentTheme: 'light'
  }
}
