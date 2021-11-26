
teamateSchema.methods.comparePasswords =  function () {
  const teamate = this
  if (this.password !== this.confirmpass) {
    return new Error('passwords do not match');
  }

}