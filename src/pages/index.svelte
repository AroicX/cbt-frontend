<script>
  import {
    metatags,
    url
  } from '@roxi/routify'
  import {
    goto
  } from '@roxi/routify';
  import {
    onMount
  } from 'svelte';
  import Toastr from 'toastr';
  import {
    ADMIN_LOGIN
  } from '../actions/authentications';
  import {
    __deserialize,
    __serialize
  } from '../helpers';
  metatags.title = 'School Mo'
  metatags.description = 'Administrator Login - CBT App'


  let data = {
    email: '',
    password: ''
  }
let showPassword = false

  onMount(() => {
    const isLoggedIn = __deserialize('adminUser')
    if (isLoggedIn) {
      return $goto('/app')
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();

    // Toastr.error("Exam has been disabled till 8am Tomorrow");
    // return false;
    const callback = (response) => {
      console.log(response);

      window.localStorage.adminUser = __serialize(
        response
      )

      if (__deserialize('adminUser')) {
        console.log('called');
        return $goto('/app')
      }
    }
    const onError = (error) => {

      if (error.data) {
        Toastr.error(error.data.message)
        return false;
        console.log(error.response)
      }
    }

    ADMIN_LOGIN(data, callback, onError)
  }
</script>

<div class="nk-app-root">
  <!-- main @s -->
  <div class="nk-main ">
    <!-- wrap @s -->
    <div class="nk-wrap nk-wrap-nosidebar">
      <!-- content @s -->
      <div class="nk-content ">
        <div class="nk-block nk-block-middle nk-auth-body wide-xs">
          <div class="brand-logo pb-4 text-center">
            <a href="/" class="logo-link font-bold text-gray-600 text-2xl">
              <img class="mx-auto my-2" src="../../images/fa-logo.jpeg" srcset="../../images/fa-logo.jpeg"
              alt="logo" style="width: 150px !important; height: 150px !important">
              FA ENTRANCE - <span class="text-blue-600"> EXAMINATIONS </span> 
            </a>
          </div>
          <div class="card card-bordered">
            <div class="card-inner card-inner-lg">
              <div class="nk-block-head">
                <div class="nk-block-head-content">
                  <h4 class="nk-block-title text-2xl font-bold">Administrator Login</h4>
                  <div class="nk-block-des">
                    <!-- <p>
                      Welcome back, please sign-in to contiune
                    </p> -->
                  </div>
                </div>
              </div>
              <form on:submit={handleSubmit}>
                <div class="form-group">
                  <div class="form-label-group">
                    <label class="form-label" for="default-01">
                      Email & Password
                    </label>
                  </div>
                  <input type="text" class="form-control form-control-lg" id="default-01"
                    placeholder="Enter your email address or username" bind:value={data.email} />
                </div>
                <div class="form-group">
                  <!-- <div class="form-label-group">
                    <label class="form-label" for="password">Passcode</label>
                    <a class="link link-primary link-sm"  href={$url('#')}>
                      Forgot Code?
                    </a>
                  </div> -->
                  <div class="form-control-wrap">
                    <a href={$url('#')} class="form-icon form-icon-right passcode-switch" data-target="password" on:click={() => showPassword = !showPassword}>
                      <em class="passcode-icon icon-show icon ni ni-eye" />
                      <em class="passcode-icon icon-hide icon ni ni-eye-off" />
                    </a>
                    <input type={`${showPassword ? 'text' : 'password'}`} class="form-control form-control-lg" id="password"
                      placeholder="Enter your passcode" on:change={(e) => data.password = e.target.value
                       } />
                  </div>
                </div>
                <div class="form-group">
                  <!-- <a href={$url('/app/')}> -->
                  <button type="submit" class="btn btn-lg btn-primary btn-block">
                    Sign in
                  </button>
                  <!-- </a> -->
                </div>
              </form>
              <!-- <div class="form-note-s2 text-center pt-4">
                New on our platform?
                <a href={$url('#')}>
                  Create an account
                </a>
              </div> -->

            </div>
          </div>
        </div>

      </div>
      <!-- wrap @e -->
    </div>
    <!-- content @e -->
  </div>
  <!-- main @e -->
</div>
