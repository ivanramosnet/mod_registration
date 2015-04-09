<?php
/**
 * @package     Joomla.Site
 * @subpackage  mod_registration
 *
 * @copyright   Copyright (C) 2015 Iván Ramos Jiménez. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

// Include the syndicate functions only once
require_once __DIR__ . '/helper.php';

$form            = ModRegistrationHelper::getForm($params);
$moduleclass_sfx = htmlspecialchars($params->get('moduleclass_sfx'));

$user = JFactory::getUser();
if ($user->guest)
	require JModuleHelper::getLayoutPath('mod_registration', $params->get('layout', 'default'));