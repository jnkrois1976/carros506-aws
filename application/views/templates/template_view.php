<?php $this->load->view('templates/header_view', $data); ?>

<?php $this->load->view($data['main_content'], $data); ?>

<?php $this->load->view('templates/footer_view'); ?>
