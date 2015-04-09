<?php
/**
 * @package     Joomla.Site
 * @subpackage  mod_registration
 *
 * @copyright   Copyright (C) 2015 Iván Ramos Jiménez. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

/**
 * Helper for mod_registration
 *
 * @package     Joomla.Site
 * @subpackage  mod_registration
 * @since       1.6
 */
abstract class ModRegistrationHelper
{
	/**
	 * Retrieve the form
	 *
	 * @param   \Joomla\Registry\Registry  &$params  module parameters
	 *
	 * @return  mixed
	 *
	 * @since   1.6
	 */
	public static function getForm(&$params)
	{
		JForm::addFormPath(dirname(__FILE__).'/forms');
		
		// get the JForm object
		$form = JForm::getInstance('mod_registration.registration', 'registration', array('control' => 'jform'));
		
		return $form;
	}
}
