const fs = require('fs');
const path = require('path');

const target = path.join(__dirname, 'node_modules', 'rollup', 'dist', 'native.js');
if (fs.existsSync(target)) {
  let content = fs.readFileSync(target, 'utf8');
  if (!content.includes('@rollup/wasm-node/dist/native.js')) {
    content = content.replace(
      'return require(id);\n\t} catch (error) {',
      'return require(id);\n\t} catch (error) {\n\t\ttry { return require("@rollup/wasm-node/dist/native.js"); } catch (e) {}'
    );
    fs.writeFileSync(target, content, 'utf8');
    console.log('[NLAMS] Applied Rollup WASM fallback patch for Windows Application Control.');
  }
}
