<?php
defined('BASEPATH') OR exit('No direct script access allowed');


if($this->config->item('maintenance_mode')){
    $route['default_controller'] = 'Maintenance';
}else{
    $route['default_controller'] = 'Site';
}
$route['404_override'] = 'custom_404';
$route['translate_uri_dashes'] = FALSE;

// CUSTOM SEO FRIENDLY ROUTES

#$route['check_service_status'] = 'pages/check_service_status';
#$route['check_service_status/(:any)'] = 'pages/check_service_status';
//$route['buscar'] = 'buscar/test';

/*$route['resultados/(:any)'] = function ($product_type, $id)
{
    return 'catalog/product_edit/' . strtolower($product_type) . '/' . $id;
};*/