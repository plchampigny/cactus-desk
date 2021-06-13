import { Command, flags } from '@oclif/command';
import { deskManager } from 'idasen-controller';


class CactusDesk extends Command {
  static description = 'Allows moving an Idasen desk to a desired position';

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
  };

  static args = [{name: 'height', required: true, description: 'The height to move the idasen desk to', parse: (heightStr: string) => +heightStr}];

  async run() {
    const {args, flags} = this.parse(CactusDesk);
    const height = args.height;
    try {
      const devices = await deskManager.getAvailableDevices();
      const desk = devices.find(x => x.name.includes('Desk'));

      if (desk != null) {
        const success = await deskManager.connectAsync(desk.address)
        if (success === 'success') {
          try {
            await deskManager.deskController.moveToAsync(height);
          } finally {
            await deskManager.disconnectAsync();
          }
        }
      } else {
        this.error('Couldn\'t find desk around. Verify that the desk has been added to the computer bluetooth device list and the desk is not currently being used by another device.');
      }
    } catch (err) {
      this.debug('An error occured while trying to find available device. Verify that your using LibUSB as a driver to communicate with the device. Try downloading Zadig to change device driver manually.');
      this.error(err);

    }
    this.exit(0);
  }
}

export = CactusDesk;
