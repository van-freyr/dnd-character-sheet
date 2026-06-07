const fs = require('fs');
const path = require('path');
const {
  Data,
  NtExecutable,
  NtExecutableResource,
  Resource,
} = require('resedit');

module.exports = async function applyWindowsIcon(context) {
  if (context.electronPlatformName !== 'win32') return;

  const executablePath = path.join(context.appOutDir, 'electron.exe');
  const iconPath = path.join(
    context.packager.projectDir,
    'build',
    'vanfreyr.ico',
  );
  const executable = NtExecutable.from(fs.readFileSync(executablePath));
  const resources = NtExecutableResource.from(executable);
  const iconFile = Data.IconFile.from(fs.readFileSync(iconPath));

  Resource.IconGroupEntry.replaceIconsForResource(
    resources.entries,
    1,
    1033,
    iconFile.icons.map((icon) => icon.data),
  );
  resources.outputResource(executable);
  fs.writeFileSync(executablePath, Buffer.from(executable.generate()));
};
