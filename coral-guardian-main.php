<?php
/**
 * Plugin Name: Adopte un corail / Main plugin
 * Plugin URI:
 * Description: Gestion client des plugins "Adopte un corail"
 * Version: 0.1
 * Requires PHP: 8.1
 * Author: Benoit DELBOE & Grégory COLLIN
 * Author URI:
 * Licence: GPLv2
 */

use D4rk0snet\Adoption\Enums\CoralAdoptionActions;
use D4rk0snet\Coralguardian\Listener\DonationCreatedListener;
use D4rk0snet\Coralguardian\Listener\NewAdoptionListener;
use D4rk0snet\Coralguardian\Listener\NewGiftAdoptionListener;
use D4rk0snet\Coralguardian\Plugin;
use D4rk0snet\Coralguardian\Service\AdminService;
use D4rk0snet\Donation\Enums\CoralDonationActions;
use D4rk0snet\GiftCode\Enum\CoralGiftActions;

add_action('plugins_loaded', [Plugin::class, "launchActions"]);
add_action('admin_menu', [AdminService::class, "addTopMenu"]);
add_action("admin_notices", [AdminService::class, "handleAdminNotices"]);
add_action("init", [AdminService::class, "init"]);
add_action('cli_init', [Plugin::class,'addCliCommand']);
add_action(CoralGiftActions::GIFTADOPTION_GIFTCODE_CREATED->value, [NewGiftAdoptionListener::class, 'doAction'], 10, 2);
add_action(CoralAdoptionActions::ADOPTION_CREATED->value, [NewAdoptionListener::class, 'doAction'], 10, 2);
add_action(CoralDonationActions::DONATION_CREATED->value, [DonationCreatedListener::class, 'doAction'], 10, 2);
