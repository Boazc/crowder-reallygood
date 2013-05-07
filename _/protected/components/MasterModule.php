<?php
/**
 * Master Module class that represents the parent module
 * for all sub modules, each modules (admin, site, etc...)
 * Should extend from this class as it provides several common
 * operations, tasks and class members
 */
class MasterModule extends CWebModule {
    /**
     * Module constructor - Builds the initial module data
     *
     *
     * @author vadim
     *
     */
    public function init() {
		
        parent::init();
    }

}