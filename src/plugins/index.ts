import { PluginRegistry } from "../engine/registry";
import { lengthPlugin } from "./length";
import { weightPlugin } from "./weight";
import { temperaturePlugin } from "./temperature";
import { currencyPlugin } from "./currency";
import { digitalPlugin } from "./digital";
import { volumePlugin } from "./volume";
import { areaPlugin } from "./area";
import { speedPlugin } from "./speed";
import { timePlugin } from "./time";
import { pressurePlugin } from "./pressure";
import { energyPlugin } from "./energy";
import { anglePlugin } from "./angle";
import { devUtilitiesPlugin } from "./dev-utilities";

/**
 * Initializes and registers all converter plugins.
 */
export function registerAllPlugins(): void {
  PluginRegistry.register(lengthPlugin);
  PluginRegistry.register(weightPlugin);
  PluginRegistry.register(temperaturePlugin);
  PluginRegistry.register(currencyPlugin);
  PluginRegistry.register(digitalPlugin);
  PluginRegistry.register(volumePlugin);
  PluginRegistry.register(areaPlugin);
  PluginRegistry.register(speedPlugin);
  PluginRegistry.register(timePlugin);
  PluginRegistry.register(pressurePlugin);
  PluginRegistry.register(energyPlugin);
  PluginRegistry.register(anglePlugin);
  PluginRegistry.register(devUtilitiesPlugin);
}

// Auto-register on module load
registerAllPlugins();
