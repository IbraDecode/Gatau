import Memory from '../../app/Models/Memory.js';
export default {
  async up() {
    await Memory.init();
  },
  async down() {}
};
