export const setUser = (user: { name: string; age: number; role: string }) => ({
  type: 'SET_USER',
  payload: user,
});
